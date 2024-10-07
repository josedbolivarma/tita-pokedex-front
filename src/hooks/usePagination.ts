import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"


export const usePagination = () => {
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const navigate = useNavigate();

    const limit = 12; // Número de pokemones por página
    const offset = (page - 1) * limit;

    console.log(searchParams.get("page"));

    const nextPage = () => {
        setPage(page + 1);
        navigate(`/?page=${page + 1}`);
        window.scrollTo({top: 0, left: 0, behavior: "smooth" });
    }

    const prevPage = () => {
        setPage(page - 1);
        navigate(`/?page=${page - 1}`);
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