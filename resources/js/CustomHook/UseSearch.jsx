import React, { useRef, useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from "@inertiajs/react";
import { FaRedo } from 'react-icons/fa';

const UseSearch = ({ action }) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const initialSearch = urlSearchParams.get('search') || '';

    const { get, errors,setData } = useForm({
        search: initialSearch,
    });

    const [searchData, setSearchData] = useState({
        search: initialSearch
    });

    const [shouldFetch, setShouldFetch] = useState(false);
    const idSetTime = useRef(null);

    useEffect(() => {
        setData('search',searchData.search);
    }, [searchData]);

    useEffect(() => {
        if (shouldFetch) {
            fetchTransactions();
        }
        setData('search',searchData.search);

        return () => clearTimeout(idSetTime.current);
    }, [shouldFetch]);

    const fetchTransactions = async () => {
        try {
            await get(action,{ search: searchData.search }, {
                preserveScroll: true,
                onError: (errors) => {
                    console.error("API Errors:", errors);
                },
                onSuccess: () => {
                    console.log('Fetch successful');
                    if (searchData.search.trim()) {
                        // Update the URL with the current search query
                        const newUrl = `${window.location.pathname}?search=${encodeURIComponent(searchData.search)}`;
                        window.history.replaceState(null, '', newUrl);
                        setSearchData({search: setData});
                    }else{
                        window.history.replaceState(null, '', `${window.location.pathname}`);
                    }
                }
            });
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setShouldFetch(false);
        }
    };

    const handleChange = (e) => {
        clearTimeout(idSetTime.current);
        // setSearchData({search:e.target.value});

        const newSearchValue = e.target.value;
        setSearchData({ search: newSearchValue })

        idSetTime.current = setTimeout(() => {
            if (searchData.search.trim()) {
                setShouldFetch(true);
            }
        }, 1000);
    };

    const handleReset = () => {
        // Reset search input
        setSearchData({ search: '' });
        setData('search','');
        setShouldFetch(true);        
    };

    return (
        <>
            <div className="ml-4">
                <InputLabel htmlFor="search" value="" />
                <TextInput
                    id="search"
                    value={searchData.search}
                    onChange={handleChange}
                    className="mt-4 block w-full"
                    placeholder="Search"
                    style={{  height: "34px"}}
                />
                <InputError message={errors.search} className="mt-2" />
            </div>
            <div className="ml-4">
                <PrimaryButton onClick={handleReset} className="mt-4">
                    <FaRedo className="mr-2" />
                </PrimaryButton>
            </div>
        </>
    );
};

export default UseSearch;
