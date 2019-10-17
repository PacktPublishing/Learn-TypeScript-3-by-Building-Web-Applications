import React, { useState } from 'react';
import ApolloClient, { ApolloQueryResult } from 'apollo-boost';
import { Search } from '../components/search';
import Container from 'react-bootstrap/Container';
import { FindArtists, FindArtists_artists, FindArtistsVariables } from '../generated/FindArtists';
import { FindArtistsQuery, FindLyricsQuery, FindSongsQuery } from '../graphql/queries';
import { FindSongs, FindSongs_songs, FindSongsVariables } from '../generated/FindSongs';
import { SongsList } from '../components/songs-list';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { FindLyrics, FindLyricsVariables } from '../generated/FindLyrics';
import { RouteComponentProps } from 'react-router';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

export const Home = (props: RouteComponentProps) => {
    const [foundArtists, updateFoundArtists] = useState<FindArtists_artists[]>([]);
    const [foundSongs, updateFoundSongs] = useState<FindSongs_songs[]>([]);
    const [artistsLoading, setArtistsLoading] = useState(false);
    const [songsLoading, setSongsLoading] = useState(false);

    const search = (searchText: string) => {
        console.log(`Home: searching for ${searchText}`);

        setArtistsLoading(true);
        apolloClient.query<FindArtists, FindArtistsVariables>({
            query: FindArtistsQuery,
            variables: {value: searchText}
        }).then((result: ApolloQueryResult<FindArtists>) => {
            console.log('Home: found artists: ', result.data);
            updateFoundArtists(result.data.artists);
        }).finally(() => setArtistsLoading(false));

        setSongsLoading(true);
        apolloClient.query<FindSongs, FindSongsVariables>({
            query: FindSongsQuery,
            variables: {value: searchText}
        }).then((result: ApolloQueryResult<FindSongs>) => {
            console.log('Home: found songs: ', result.data);
            updateFoundSongs(result.data.songs);
        }).finally(() => setSongsLoading(false));
    };

    const searchInputCleared = () => {
        console.log('Home: search cleared');
        updateFoundArtists([]);
        updateFoundSongs([]);
    };

    const songSelected = (selectedSong: FindSongs_songs) => {
        console.log('Home: song selected: ', selectedSong);

        apolloClient.query<FindLyrics, FindLyricsVariables>({
            query: FindLyricsQuery,
            variables: {
                id: selectedSong.id,
            },
        }).then((result: ApolloQueryResult<FindLyrics>) => {
            const songLyrics = result.data.songLyrics;
            console.log(`Home: lyrics loaded for [${selectedSong.name}]: ${songLyrics.lyrics}`);

            props.history.push('/lyrics', {
                song: selectedSong,
                songLyrics,
            });
        }).catch((error: any) => {
            console.log('Home: error while loading lyrics: ', error);
        });
    };

    const foundArtistsList = foundArtists.map(item => <li key={item.id}>{item.name}</li>);

    return (
        <Container className='lf-home'>
            <Search searchCleared={searchInputCleared} searchTriggered={search}/>

            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} variant='link' eventKey='0'>
                        <h3>Artists</h3>
                        { artistsLoading &&
                            <Spinner animation='border' role='status'>
                                <span className='sr-only'>Loading...</span>
                            </Spinner>
                        }
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='0'>
                        <Card.Body>
                            <ul>
                                {foundArtistsList}
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle as={Card.Header} variant='link' eventKey='1'>
                        <h3>Songs</h3>
                        { songsLoading ? (
                            <Spinner animation='border' role='status'>
                                <span className='sr-only'>Loading...</span>
                            </Spinner>
                        ) : null}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='1'>
                        <Card.Body>
                            <SongsList songs={foundSongs} songSelected={songSelected}/>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Container>
    );
};
