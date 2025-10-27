import React from 'react'

const About = () => {
  return (
      <div className="pt-20 px-4 md:px-20 container mx-auto">
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">Welcome to BookSwap!</h1>
          <p className="mb-6">
            BookSwap is your go-to platform for discovering and exchanging books effortlessly. We’re dedicated to fostering a community where book lovers can connect, share, and grow their reading collections sustainably.
          </p>
          <h2 className="text-xl font-semibold mb-2">Why BookSwap?</h2>
          <ul className="list-disc list-inside mb-6">
            <li><strong>Sustainable:</strong> Extend the life of books and reduce waste.</li>
            <li><strong>Inclusive:</strong> Find books in various genres and languages.</li>
            <li><strong>Community:</strong> Connect with fellow readers and join discussions.</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal list-inside mb-6">
            <li><strong>Sign Up:</strong> Create your profile.</li>
            <li><strong>List Books:</strong> Share books you want to exchange.</li>
            <li><strong>Browse:</strong> Find books you’d like to read.</li>
            <li><strong>Exchange:</strong> Arrange the swap and enjoy your new book!</li>
          </ol>
          <h2 className="text-xl font-semibold mb-2">Join Us!</h2>
          <p>Start your reading adventure with BookSwap today and connect with a global community of book enthusiasts.</p>
        </div>
      </div>
  )
}

export default About
