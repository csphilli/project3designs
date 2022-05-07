import React from "react";
import * as styles from "../scss/LearnMoreUl.module.scss";
import LearnMoreLi from "./LearnMoreLi";

function LearnMoreUl({ data, index }) {
    return (
        <ul className={styles.list_container}>
			{data[index].list.map(item =>{
				<LearnMoreLi key={}data={data} index={index} />
			})}
            
        </ul>
    );
}

export default LearnMoreUl;
