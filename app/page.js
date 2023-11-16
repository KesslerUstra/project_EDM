'use client'

import React from 'react';
import { useEffect } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import Aos from 'aos';
import Image from 'next/image';
import styles from './page.module.css';
import 'aos/dist/aos.css';

import LogoViewer from '@/components/LogoViewer';
import HomeLoading from '@/components/Loading/HomeLoading';

import problemImage from '../public/img/problem.png';
import defaultImage from '../public/img/default_problems.png';
import createImage from '../public/img/create_problems.png';
import metricsImage from '../public/img/metrics_problems.png';
import aboutImage from '../public/img/about_edm.png';


export default function Home() {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Aos.init({
        duration: 600,
        offset: 250,
        once: true
      });
    }
  }, []);


  return (
    <>
      <Suspense fallback={<HomeLoading />}>
        <div className={styles.main}>
          <div className={styles.logo}>
            <LogoViewer />
          </div>
          <div className={styles.section_box}>
              <div className={styles.title_section_box}>
                <span>Problemas</span>
                <div></div>
              </div>
              <div className={styles.section_content_box}>
                <div data-aos="zoom-out-right" className={styles.image_section_box} style={{'--max_height': '180px'}}>
                  <Image priority={true} style={{objectFit: 'contain', width: '100%', height: '100%'}} src={problemImage} alt='Imagem genetica e computação' />
                </div>
                <div data-aos="fade-left" data-aos-delay="300" className={styles.text_section_box}>
                  <p>
                    Este website é o resultado de um projeto de iniciação científica dedicado ao ensino de otimização com o Algoritmo de Evolução Diferencial Melhorada (EDM) para fins educacionais.
                  </p>
                  <p>
                    Teste as soluções existentes e crie seus próprios testes. Desvende novas possibilidades, desafie-se e contribua para a evolução da ciência computacional!
                  </p>
                  <div className={styles.button_box}>
                    <Link className={styles.button} href={'/problems'}>
                      <span>Pagina de Problemas</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.cards_box}>
                <div data-aos="fade-up" className={styles.card_box}>
                  <div className={styles.image_card_box}>
                    <Image priority={false} style={{objectFit: 'contain', width: '100%', height: '100%'}} src={defaultImage} alt='Imagem Lista de problemas' />
                  </div>
                  <span></span>
                  <h4>Problemas Pré-Definidos</h4>
                  <p>
                    Nosso site oferece uma variedade de problemas prontos para você. Explore os problemas e aprenda mais sobre o EDM.
                  </p>
                </div>
                <div data-aos="fade-up" data-aos-delay="150" className={styles.card_box}>
                  <div className={styles.image_card_box}>
                    <Image priority={false} style={{objectFit: 'contain', width: '100%', height: '100%'}} src={createImage} alt='Imagem Criação de problemas' />
                  </div>
                  <span></span>
                  <h4>Criador de Problemas</h4>
                  <p>
                    Explore sua criatividade e crie novos problemas de otimização com o nosso Criador de Problemas. Você pode criar e compartilhá-los com a comunidade.
                  </p>
                </div>
                <div data-aos="fade-up" data-aos-delay="300" className={styles.card_box}>
                  <div className={styles.image_card_box}>
                    <Image priority={false} style={{objectFit: 'contain', width: '100%', height: '100%'}} src={metricsImage} alt='Imagem Estilização das métricas dos problemas' />
                  </div>
                  <span></span>
                  <h4>Métricas Editáveis</h4>
                  <p>
                    Explore uma gama diversificada de métricas editáveis em nossos problemas! Personalize os critérios de avaliação de acordo com suas necessidades
                  </p>
                </div>
              </div>
          </div>
          <div className={styles.section_box}>
            <div className={styles.title_section_box} style={{marginBottom: '100px'}}>
              <span>Sobre</span>
              <div></div>
            </div>
            <div className={styles.section_content_box}>
              <div data-aos="zoom-out-right" className={styles.image_section_box} style={{paddingTop: '0px', '--max_height': '250px'}}>
                <Image priority={false} style={{objectFit: 'contain', width: '100%', height: '100%'}} src={aboutImage} alt='Imagem sobre o EDM' />
              </div>
              <div data-aos="fade-left" data-aos-delay="300" className={styles.text_section_box}>
                <p>
                  O EDM é um algoritmo evolutivo adaptado para trabalhar com problemas de otimização multiobjetivos e na presença de restrições.
                </p>
                <p>
                  Demonstrado a partir de uma pesquisa acadêmica, nós buscamos tornar acessível e compreensível os conceitos intrincados do (EDM). Em nossa jornada educacional, compartilhamos não apenas o conhecimento, mas também a paixão por desvendar os segredos da otimização computacional.
                </p>
                <p>
                  Para entender mais sobre os fundamentos por trás do nosso trabalho, convidamos você a explorar a tese acadêmica original que inspirou este projeto. Clique no link abaixo para acessar a tese completa.
                </p>
                <div className={styles.button_box}>
                  <a className={styles.button} href='https://repositorio.ufu.br/handle/123456789/14760' target="_blank" rel="noopener noreferrer">
                    <span>Tese Acadêmica</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>Criado por <a target='_blank' href="https://www.linkedin.com/in/eduardo-kessler-ustra">Eduardo Kessler</a></div>
        </div>
      </Suspense>
    </>
  )
}