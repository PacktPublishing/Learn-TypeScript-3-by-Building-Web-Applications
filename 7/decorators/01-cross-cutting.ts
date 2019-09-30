
class BankService {
    constructor() {

    }

    public depositMoney(amount: number): void {
        log(`Persisting account change - start: ${new Date()}`);

        if(!isAuthenticated) {
            log('Refused to deposit money');
            throw new Error('Only authenticated users can deposit money');
        }

        if(!amount || amount <= 0) {
            throw new Error('The amount is not valid');
        }

        try {
            doInTransaction(() => {
              // try to do something interesting
              commitTransaction();
            });
        } catch(error) {
            log(`Operation failed: ${error}`);
            rollbackTransaction();
        }

        log(`Persisting account change - end: ${new Date()}`);
    }
}
