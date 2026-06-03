import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import './list.css';
import '../../../Components/blogcomponents/blogs.css';
import { useState, useEffect } from 'react';
import BlogItem from '../../../Components/blogcomponents/blogitem';
import LoadingModal from '../../../Components/modals/LoadingModal';
import Pagination from '../../../Components/shared/components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
export default function CategoriesList() {
    const { categoryName } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page") || 1) - 1;
    const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL;
    useEffect(() => {
        async function getCategories() {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL_BLOGS}Categories/${categoryName}?page=${currentPage + 1}&limit=8`);
                const result = await res.json();
                setBlogs(result.blogs);
                setPageCount(result.totalPages);
            }
            catch (e) {
                console.log(e);
                setBlogs([]);
            }
            finally {
                setLoading(false);
            }
        }
        getCategories();
    }, [API_URL_BLOGS, categoryName, currentPage]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: 'list-container', children: [_jsx(Pagination, { searchParams: searchParams, setSearchParams: setSearchParams, pageCount: pageCount }), _jsx("div", { className: 'header-wrapper', children: _jsxs("h1", { className: 'categories-h1', children: [categoryName, " Blogs"] }) }), _jsxs("div", { className: 'category-list', children: [loading && _jsx("div", { className: 'loading-modal', children: _jsx(LoadingModal, {}) }), !loading && (blogs === null || blogs === void 0 ? void 0 : blogs.length) > 0 && (_jsx(BlogItem, { Blogs: blogs })), !loading && (blogs === null || blogs === void 0 ? void 0 : blogs.length) === 0 && (_jsx("h1", { children: "No blogs for this category yet" }))] })] }) }));
}
