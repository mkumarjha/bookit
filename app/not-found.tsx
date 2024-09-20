import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className='display-1 fw-bold'>404</h1>
                    <p className="fs-3">
                        <span className='text-danger'>Opps!</span> Page not found.
                    </p>
                    <p className="lead">The page your are looking for does not exist.</p>
                    <Link href="/" className="btn btn-danger">Go Home</Link>
                </div>
            </div>    
        </div>
    )
}

export default NotFound