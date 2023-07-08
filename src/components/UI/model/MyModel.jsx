import React from "react";
import cl from "./MyModel.module.css";

const MyModel = ({children, visible, setVisible}) => {

    const rootClass = [cl.myModel];
    if(visible){
        rootClass.push(cl.active);
    }

    return(
       <div className={rootClass.join(" ")} onClick={() => setVisible(false)}>
        <div className={cl.myModelContent} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
       </div>
    )
}

export default MyModel;