import React from 'react'
import "../style/home.scss"
const Home = () => {
  return (
    <main className="home">
        <div className="interview-input-group">
            <div className="left">
                <textarea name="jobDescription" id="jobDescription" placeholder='Enter job Description'></textarea>
            </div>
            <div className="right">
                <div className="input-group">
                    <label className="file-label" htmlFor='resume'>Upload Resume</label>
                    <input type='file' name='resume' id='resume' accept='.pdf' />
                </div>
                <div className="input-group">
                    <label htmlFor='selfDescription'>Self description</label>
                    <textarea name='selfDescription' id='selfDescription' placeholder="Discribe yourself " />
                </div>
                <button className="generate-btn">Generate Interview</button>
            </div>
        </div>
    </main>
  )
}

export default Home