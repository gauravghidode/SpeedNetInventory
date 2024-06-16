import React from 'react'
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import 'react-responsive-modal/styles.css';

const About = () => {


  return (
    <>

    <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className='text-4xl font-bold leading-none tracking-tight sm:text-6xl'>Speednet Tenda</h1>
        <div className="stats bg-primary shadow">
            <div className="stat">
                <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
                    Inc
                </div>
            </div>
        </div>
    </div>

    
    <p className='mt-6 text-lg leading-8 max-w-2xl mx-auto'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eaque, debitis laboriosam obcaecati dolorum itaque iste aliquid quasi tempore quae.
    </p>
    </>
  )
}

export default About