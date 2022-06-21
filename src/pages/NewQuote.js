import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {

    const { sendRequest, status} = useHttp(addQuote);
    const history = useHistory();

    useEffect(()=>{
     if(status === 'completed'){
        history.push('/quotes')
     }
    }, [status, history])

    const addQuoteHandler = (quote) =>{
        sendRequest(quote);
    }

    return (
        <>
            <h1>New quote page</h1>
            <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
        </>

    )
}

export default NewQuote;