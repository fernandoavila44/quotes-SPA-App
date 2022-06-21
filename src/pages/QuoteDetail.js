import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Comments from '../components/comments/Comments';
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const QuoteDetail = () => {

    const {sendRequest, status, data: selectedQuote, error} = useHttp(getSingleQuote, true)
    const match = useRouteMatch();
    const params = useParams();

    useEffect(()=>{
        sendRequest(params.quoteid)
    }, [ sendRequest, params.quoteid])

    if(status === 'pending'){
        return(
            <div className='centered'>
                <LoadingSpinner />
            </div>
        ) 
    }

    if(error){
        return(
            <div className='centered'>
                <p>{error}</p>
            </div>
        )
    }

    if(!selectedQuote.text){
        return(
          <p>No quote found!</p>
        )
    }

    return (
        <>
            <HighlightedQuote text={selectedQuote.text} author={selectedQuote.author} />
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>Show Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`} exact>
                <Comments />
            </Route>
        </>
    )
}

export default QuoteDetail;