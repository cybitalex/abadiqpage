import React, { useState, useEffect, useInsertionEffect} from 'react'

export const DateTime = () => {
    var [date, setDate] = useState(new Date());

    useInsertionEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000)

        return function cleanup() {
            clearInterval(timer)
        }
    })

    return (
        <div>
            <p> Time : {date.toLocaleTimeString()}</p>
            <p> Date : {date.toLocaleDateString()}</p>
        </div>
    )

}

export default DateTime
