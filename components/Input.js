"use client"

export default function Input({label, onChange, type}){
    return(
        <>
            <h5>{label}</h5>
            <input onChange={e => onChange(e)} type={type} />
        </>
    )
}