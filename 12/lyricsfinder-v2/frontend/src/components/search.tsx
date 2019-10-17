import React, { FormEvent, useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

type Props = {
    searchTriggered: (searchText: string) => void;
    searchCleared: VoidFunction;
};

export const Search = (props: Props) => {
    const [searchText, updateSearchText] = useState('');

    useEffect(() => {
        console.log('Search: component rendered');
    });

    const searchHandler: VoidFunction = () => {
        console.log('Search: search handler called. Search text: ', searchText);
        if (searchText === '') {
            clearHandler();
        } else {
            props.searchTriggered(searchText);
        }
    };

    const clearHandler = () => {
        updateSearchText('');
        props.searchCleared();
    };

    const handleSearchTextInputChange = (event: FormEvent<FormControlProps>): void => {
        const searchInputNewValue: string = event.currentTarget.value || '';
        updateSearchText(searchInputNewValue);
        console.log(`Search: search text changed to [${searchInputNewValue}]`);
    };

    return (
        <Container className='lf-search'>
            <FormGroup id='searchForm'>
                <InputGroup size='lg'>
                    <FormControl id='searchText' type='text'
                                 placeholder='Artist or song to search for'
                                 aria-label='Artist or song to search for'
                                 value={searchText}
                                 onChange={handleSearchTextInputChange}
                                 onKeyUp={(e: React.KeyboardEvent) => e.key === 'Enter' ? searchHandler() : null}
                    />
                    <InputGroup.Append>
                        <Button variant='secondary' aria-label='Clear the search text' onClick={clearHandler}>X</Button>
                        <Button variant='primary' aria-label='Search' onClick={searchHandler}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </FormGroup>
        </Container>
    );
};
