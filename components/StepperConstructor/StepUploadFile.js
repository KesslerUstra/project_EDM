'use client'

import styles from './StepUploadFile.module.css'

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import TitleSection from "../TitleSection";
import useProblemContext from '@/hooks/useProblemContext';
import StepperControls from '../StepperControls';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { LuFileJson } from 'react-icons/lu';
import { IoMdTrash } from 'react-icons/io';
import { verifyUploadFile } from '@/public/functions/verifyValues';


export default function StepUploadFile({step}){

    const [file, setFile] = useState({});
    const [error, setError] = useState({});
	const {state, dispatch} = useProblemContext();

	console.log(state)
	console.log('renderizou')

    function deleteFile(){
        dispatch({type: 'deleteAll'});
        setFile({});
    }

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        let message;
        console.log(acceptedFiles, fileRejections)

        if(fileRejections.length > 0 || acceptedFiles.length > 1){
            message = fileRejections.length > 1 || acceptedFiles.length > 1 ? 'Selecione apenas um arquivo' : 'Arquivo inválido'
            setError({active: true, message: message});
            return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
            console.log(acceptedFiles[0])
            const jsonData = JSON.parse(reader.result);
            console.log(jsonData)
            // verifyUploadFile(jsonData)
            if(jsonData.title){
                let fileData = {title: acceptedFiles[0].name, size: acceptedFiles[0].size, data: {dimension: jsonData.dimension, restricion: jsonData.restrictions?.active}};
                console.log('Arquivo válido:', jsonData);
                console.log(fileData)
                dispatch({type: 'importAll', payload: {data: jsonData}})
                setFile(fileData);
                setError({});
            }else{
                setError({active: true, message: 'Problema Inválido. Verifique se o arquivo está correto'});
            }
        };
        reader.readAsText(acceptedFiles[0]);
    }, [dispatch]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 3 * 1024 * 1024,
        accept: {
            'application/json': ['.json']
        },
    })

	function controlStepper(){
        try {
            if(Object.keys(file).length === 0){
                setError({active: true, message: 'Arquivo necessário'});
                return;
            }
            dispatch({type: 'changeStep', payload: {value: step + 1}})
        } catch (error) {
            console.error("Erro durante a execução do algoritmo:", error);
        }
    }

    return(
		<>
            <TitleSection title={'Upload'} />
            <div className={styles.upload_container}>
                <div className={styles.upload_problem_box}>
                    <div {...getRootProps()} className={styles.upload_problem} >
                        <input {...getInputProps()} />
                        <AiOutlineCloudUpload />
                        <p><span style={{fontWeight: '600'}}>Clique para enviar</span> ou arraste aqui</p>
                    </div>
                    {error.active &&
                        <div className={styles.error_message_box}>
                            <span>{error.message}</span>
                        </div>
                    }
                    {Object.keys(file).length !== 0 &&
                        <FileLoaded file={file} deleteFile={deleteFile} />
                    }
                </div>
            </div>
            <StepperControls step={step} onChangeStep={(e) => controlStepper(e)} />
		</>
    )
}

function FileLoaded({file, deleteFile}){
    return(
        <div className={styles.file_box}>
            <div className={styles.file_header_box}>
                <div className={styles.file_name_box}>
                    <LuFileJson />
                    <h4>{file.title}</h4>
                </div>
                <span>{file.size} KB</span>
            </div>
            <div className={styles.file_body_box}>
                <div className={styles.file_confg_line}>
                    <span>dimensão</span>
                    <span>{file.data?.dimension}</span>
                </div>
                <div className={styles.file_confg_line}>
                    <span>restrição</span>
                </div>
            </div>
            <IoMdTrash onClick={() => deleteFile()} className={styles.file_trash} />
        </div>
    )
}