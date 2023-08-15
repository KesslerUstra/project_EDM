"use client"

import { BsSearch } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./SearchProblems.module.css";
import { Maven_Pro } from 'next/font/google';
import { routes } from "@/app/assets/routes";
import Link from "next/link";

const mavemPro = Maven_Pro({ subsets: ['latin'] })

function SearchProblems(){
    return(
        <div className={styles.problems_list_box}>
          <div className={styles.search_problems_box}>
            <BsSearch />
            <input className={mavemPro.className} type="text" placeholder="Digite o problema" />
          </div>
          <div className={styles.list_box}>
            {
              routes.map((item, idx) =>{
                return(
                  <Link className={styles.item_problem_box} key={item.name} href={item.href}>
                    <span>{item.name}</span>
                    <IoIosArrowForward />
                  </Link>
                )
              })
            }
          </div>
        </div>
    )
}

export default SearchProblems;