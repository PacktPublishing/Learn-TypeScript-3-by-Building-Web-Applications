import {PopulationServiceImpl} from "./population-service";
import {WorldBankApiV2CountryResponse} from "./world-bank-api";

describe('population service', () => {
    let sut: PopulationServiceImpl;

    beforeEach(() => {
        sut = new PopulationServiceImpl('https://foo'); // valid URL
    });

    describe('initialization', () => {
        it('should succeed if the URL is provided and valid', () => {
            expect(new PopulationServiceImpl('https://foo')).toBeInstanceOf(PopulationServiceImpl);
            expect(new PopulationServiceImpl('https://foo/')).toBeInstanceOf(PopulationServiceImpl);
            expect(new PopulationServiceImpl('http://foo')).toBeInstanceOf(PopulationServiceImpl);
            expect(new PopulationServiceImpl('http://foo/')).toBeInstanceOf(PopulationServiceImpl);
            expect(new PopulationServiceImpl('HTTP://foo/')).toBeInstanceOf(PopulationServiceImpl);
            expect(new PopulationServiceImpl('HTTPS://foo/')).toBeInstanceOf(PopulationServiceImpl);
        });

        test('should not accept empty input', () => {
            expect(() => new PopulationServiceImpl('')).toThrow();
            expect(() => new PopulationServiceImpl('     ')).toThrow();
        });

        test('should not accept wrong prefix', () => {
            expect(() => new PopulationServiceImpl('foo://')).toThrow();
            expect(() => new PopulationServiceImpl('bar')).toThrow();
        });

        test('should not accept null input', () => {
            expect(() => new PopulationServiceImpl(null as unknown as string)).toThrow();
            expect(() => new PopulationServiceImpl(undefined as unknown as string)).toThrow();
        });
    });

    describe('checkResponseStatus', () => {
        it('should fail if no response object is passed', async () => {
            await expect(sut.checkResponseStatus(null as unknown as Response)).rejects.toThrow();
        });

        it('should fail if the status is below 200', async () => {
            await expect(sut.checkResponseStatus(new Response(null, {
                status: 199
            }))).rejects.toThrow();
        });

        it('should fail if the status is above 299', async () => {
            await expect(sut.checkResponseStatus(new Response(null, {
                status: 300
            }))).rejects.toThrow();
        });

        it('should succeed if the response has a 2xx status code', async () => {
            let fakeResponse: Response = new Response(null, {
                status: 200
            });
            await expect(sut.checkResponseStatus(fakeResponse)).resolves.toBe(fakeResponse);

            fakeResponse = new Response(null, {
                status: 204
            });
            await expect(sut.checkResponseStatus(
                fakeResponse)).resolves.toBe(fakeResponse);

            fakeResponse = new Response(null, {
                status: 299
            });
            await expect(sut.checkResponseStatus(
                fakeResponse)).resolves.toBe(fakeResponse);
        });
    });

    describe('getAllCountries', () => {
        beforeEach(() => {
            fetchMock.resetMocks();
        });

        const dummyValidData: WorldBankApiV2CountryResponse = [{"page": 1, "pages": 7, "per_page": "50", "total": 304}, [{
            "id": "ABW",
            "iso2Code": "AW",
            "name": "Aruba",
            "capitalCity": "Oranjestad",
            "longitude": "-70.0167",
            "latitude": "12.5167"
        }, {
            "id": "AFG",
            "iso2Code": "AF",
            "name": "Afghanistan",
            "capitalCity": "Kabul",
            "longitude": "69.1761",
            "latitude": "34.5228"
        }]];

        it('should succeed and return countries when the request succeeds and a valid response is received', async () => {
            fetchMock.mockResponse(
                JSON.stringify(dummyValidData),
                {status: 200}
            );

            await expect(sut.getAllCountries()).resolves.toBeTruthy();
            await sut.getAllCountries()
                .then(countries => {
                    expect(countries.length).toBe(2);

                    const dummyValidCountries = (dummyValidData[1]);

                    expect(countries[0].capitalCity).toBe(dummyValidCountries[0].capitalCity);
                    expect(countries[0].name).toBe(dummyValidCountries[0].name);
                    expect(countries[1].capitalCity).toBe(dummyValidCountries[1].capitalCity);
                    expect(countries[1].name).toBe(dummyValidCountries[1].name);
                })
                .catch(() => fail("Should not throw"));
        });

        it('should fail and throw if the response does not match the expected format', async () => {
            fetchMock.mockResponse(
                JSON.stringify({foo: "bar"}),
                {status: 200}
            );

            await expect(sut.getAllCountries()).rejects.toBeTruthy();
        });

        it('should check the response status and fail if outside of the allowed range (2xx)', async () => {
            fetchMock.mockResponse(
                JSON.stringify(dummyValidData),
                {status: 199}
            );

            await expect(sut.getAllCountries()).rejects.toBeTruthy();

            fetchMock.mockResponse(
                JSON.stringify(dummyValidData),
                {status: 300}
            );

            await expect(sut.getAllCountries()).rejects.toBeTruthy();
        });

        it('should call checkResponseStatus', async () => {
            fetchMock.mockResponse(
                JSON.stringify(dummyValidData),
                {status: 200}
            );

            const checkResponseStatusSpy = jest.spyOn(sut, "checkResponseStatus");

            await sut.getAllCountries().catch(() => {
                fail("Should not fail");
            });

            expect(checkResponseStatusSpy).toHaveBeenCalledTimes(1);
        });
    });
});
