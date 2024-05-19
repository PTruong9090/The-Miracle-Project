import React from 'react';

const YouTubeVideo = ({ url }) => {
    // Extract the video ID from the URL
    const videoId = url.split('v=')[1].split('&')[0];

    // Construct the embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-container">
            <iframe
                width="560"
                height="315"
                src={embedUrl}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
            ></iframe>
        </div>
    );
};

export default YouTubeVideo;