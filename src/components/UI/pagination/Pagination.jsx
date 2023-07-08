import React from "react";
import { GetPagesArray } from "../../../utils/pages";

const Pagination = ({totalPages, page, chengePage}) => {
  let pagesArray  = GetPagesArray(totalPages);

    return(
        <div className="page__wrapper">
            {pagesArray.map(p => 
            <span 
            key={p}
            onClick={() => chengePage(p)}
            className= {page===p ? "page page__current" : "page"}>{p}</span>
        )}
    </div>
    )
}

export default Pagination;