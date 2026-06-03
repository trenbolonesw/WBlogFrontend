import ReactPaginate from "react-paginate"
import './Pagination.css'
import { SetURLSearchParams } from "react-router-dom"

type Pagination = {
    pageCount:number,
    searchParams:URLSearchParams,
    setSearchParams:SetURLSearchParams
}
export default function Pagination({pageCount,searchParams,setSearchParams}:Pagination){

 type PageClickEvent = {
    selected:number
  }

       function handlePageClick(e:PageClickEvent){

                const currentParams = Object.fromEntries(searchParams.entries());
                setSearchParams({
                  ...currentParams,
                  page: (e.selected + 1).toString()
                })
              
                
       }



    return(
        <>
        <ReactPaginate
        breakLabel="..."
        previousLabel='prev'
        nextLabel="next"
        onPageChange={handlePageClick}
        previousClassName="prev"
        nextClassName="next"
        pageCount={pageCount}
        className='paginateContainer'
        disabledLinkClassName='paginateDisabled'
        renderOnZeroPageCount={null}
        activeClassName='activepage'
        />
        </>
    )
}