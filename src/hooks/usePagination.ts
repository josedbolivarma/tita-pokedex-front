import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { updateUrlWithType } from "../utils";


export const usePagination = () => {
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<number>(1);
    const location = useLocation();
    const navigate = useNavigate();

    const limit = 12; // Número de pokemones por página
    const offset = (page - 1) * limit;

    const nextPage = () => {
        setPage(page + 1);
        updateUrlWithType({name: "page", value: page + 1, navigate, location});
        window.scrollTo({top: 0, left: 0, behavior: "smooth" });
    }

    const prevPage = () => {
        setPage(page - 1);
        updateUrlWithType({name: "page", value: page - 1, navigate, location});
        window.scrollTo({top: 0, left: 0, behavior: "smooth" });
    }

    const backToHome = () => {
        setPage(1);
        navigate('/');
    }

    useEffect(() => {
        setPage(parseInt(searchParams.get("page")!) || 1);
    }, [searchParams]);
    
    return {
        page,
        limit,
        offset,
        nextPage,
        prevPage,
        setPage,
        backToHome
    }
}