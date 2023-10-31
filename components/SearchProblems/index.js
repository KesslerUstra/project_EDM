'use client'

import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./SearchProblems.module.css";
import { Maven_Pro } from 'next/font/google';
import { getRoutes } from "@/app/assets/routes";
import Link from "next/link";
import HomeLoading from "../Loading/HomeLoading";
import { getConfgProblems } from "@/app/assets/confg_problems";
import { IoIosAdd, IoIosArrowDown, IoIosArrowUp, IoMdDownload, IoMdTrash } from "react-icons/io";
import SimpleButton from "../Buttons/SimpleButton";
import BackButton from "../Buttons/BackButton";
import ProblemsLoading from "../Loading/ProblemsLoading";
import AnimateHeight from "react-animate-height";

const mavemPro = Maven_Pro({ subsets: ['latin'] })

function SearchProblems(){

  const [problemsList, setProblemsList] = useState({});
  const [backupList, setBackupList] = useState({});
  const [loading, setLoading] = useState(true);
  const [collapser, setCollapser] = useState({});

  useEffect(() => {
    async function getRoutesEffect(){
      if (typeof window !== 'undefined') {
        let routes = await getRoutes();
        
        const problems = {problemsDefault: [], problemsCreated: []};
        for (const problem of routes) {
          if (problem.id !== undefined) {
            problems.problemsCreated.push(problem);
          } else {
            problems.problemsDefault.push(problem);
          }
        }
        setBackupList(problems)
        setProblemsList(problems);
        setLoading(false);
      }
    }
    getRoutesEffect();
    const controller = new AbortController();

    return() =>{
      controller.abort();
    }
  }, []);


  function selectProblems(substring){

    const filteredProblemsList = {};
    for (const problemType in backupList) {
      const filteredProblems = backupList[problemType].filter(problem =>
        problem.name.toLowerCase().includes(substring.toLowerCase())
      );
      filteredProblemsList[problemType] = filteredProblems;
    }

    setProblemsList(filteredProblemsList);
  }

  function collapseSection(section){
    setCollapser(prev => ({...prev, [section]: !prev[section]}))
  }

  async function downloadProblem(e, idProblem){
    e.preventDefault();
    console.log(idProblem);
    let problem = await getConfgProblems(idProblem);
    console.log(problem)
    const json = JSON.stringify(problem);
    console.log(json)
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const linkDownload = document.createElement('a');
    linkDownload.href = url;
    linkDownload.download = 'problemaEDM.json';
    document.body.appendChild(linkDownload);
    linkDownload.click();
    document.body.removeChild(linkDownload);
    URL.revokeObjectURL(url);
  }

  return(
      <div className={styles.problems_list_box}>
        <BackButton />
        <div className={styles.options_box}>
          <div className={styles.search_problems_box}>
            <BsSearch />
            <input className={mavemPro.className} type="text" onChange={(e) => selectProblems(e.target.value)} placeholder="Digite o problema" />
          </div>
          <Link href={'problems/choice'}>
            <SimpleButton type={'green'} icon={<IoIosAdd />} text="Adicionar Problema" onClick={() =>{console.log('oi')}} />
          </Link>
        </div>
        {
          problemsList?.problemsCreated?.length > 0 &&

          <div className={styles.problems_box}>
            <div className={styles.title_type_problem_box} onClick={() => collapseSection('problemsCreated')}>
              <span>Problemas Adicionados</span>
              <div></div>
              {!collapser.problemsCreated ? 
                <IoIosArrowUp />
              :
                <IoIosArrowDown />
              }
            </div>
            <AnimateHeight
            duration={400}
            height={!collapser.problemsCreated ? 'auto' : 0}
            animateOpacity={true}>
              <div className={styles.problems_list}>
                {
                  problemsList?.problemsCreated.map((item) =>{
                    return(
                      <Link prefetch={false} className={styles.card_problem} key={item.id} href={item.href}>
                        <div>
                          <div className={styles.card_title_box}>
                            <h5>{item.name}</h5>
                            <IoIosArrowForward />
                          </div>
                          <div className={styles.card_abouts_box}>
                            <div className={styles.card_about_box}>
                              <span>dimensão:</span>
                              <span>{item.dimension}</span>
                            </div>
                            {item.restriction === true &&
                              <div className={styles.card_about_box}>
                                <span>restrição</span>
                              </div>
                            }
                          </div>
                        </div>
                        <div className={styles.card_actions_box}>
                          <IoMdTrash className={styles.trash} />
                          <IoMdDownload onClick={(e) => downloadProblem(e, item.id)}/>
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
            </AnimateHeight>
            
          </div>
        }
        {loading === true ? 
          <ProblemsLoading />
        :
          <div className={styles.problems_box}>
            <div className={styles.title_type_problem_box} onClick={() => collapseSection('problemsDefault')}>
              <span>Problemas Pré-Definidos</span>
              <div></div>
              {!collapser.problemsDefault ? 
                <IoIosArrowUp />
              :
                <IoIosArrowDown />
              }
            </div>
            <AnimateHeight
            duration={400}
            height={!collapser.problemsDefault ? 'auto' : 0}
            animateOpacity={true}>
              <div className={styles.problems_list}>
                {
                  problemsList?.problemsDefault?.map((item) =>{
                    return(
                      <Link prefetch={false} className={styles.card_problem} key={item.name} href={item.href}>
                        <div>
                          <div className={styles.card_title_box}>
                            <h5>{item.name}</h5>
                            <IoIosArrowForward />
                          </div>
                          <div className={styles.card_abouts_box}>
                            <div className={styles.card_about_box}>
                              <span>dimensão:</span>
                              <span>{item.dimension}</span>
                            </div>
                            {item.restriction === true &&
                              <div className={styles.card_about_box}>
                                <span>restrição</span>
                              </div>
                            }
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
            </AnimateHeight>
          </div>
        }
      </div>
  )
}

export default SearchProblems;