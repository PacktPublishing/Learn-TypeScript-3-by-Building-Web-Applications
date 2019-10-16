import React, {useEffect} from 'react';

import Container from 'react-bootstrap/Container';
import { FindSongs_songs } from '../generated/FindSongs';
import ListGroup from 'react-bootstrap/ListGroup';

type Props = {
    songs: FindSongs_songs[];
    songSelected: (song: FindSongs_songs) => void;
};

export const SongsList = (props: Props) => {
    useEffect(() => {
        console.log('Songs List: component rendered');
    });

    const songElements = props.songs
        .filter((song: FindSongs_songs) => song.hasLyrics)
        .map((song: FindSongs_songs) =>
            <ListGroup.Item key={song.id} className='lf-song' action style={{cursor: 'pointer'}}
                            onClick={() => props.songSelected(song)}>{song.name}</ListGroup.Item>
        );

    return (
        <Container className='lf-songs'>
            <ListGroup>
                {songElements}
            </ListGroup>
        </Container>
    );
};
