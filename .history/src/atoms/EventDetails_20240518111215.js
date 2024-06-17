import React, { useContext } from 'react';
import "./EventDetails.css"
import HeaderGlass from './EvenTImageHeader'
import EventsContext from '../logic/DataPoint';


function EventDetails() {
    const events = useContext(EventsContext);

console.log("events: ", events)
    return (
    <div className="event-detals-holder">
        <div>
        <h2 className='event-title-details'>Event Name</h2>
        <p s>close x</p>
        </div>
<HeaderGlass/>
<dvi className="event-content">
        <p className='event-full-desc'>
        In today’s rapidly evolving digital landscape, the integration of artificial intelligence (AI) has revolutionized various industries, and marketing is no exception. From personalized customer experiences to data-driven insights, AI offers unparalleled opportunities for marketers to enhance efficiency, optimize campaigns, and drive business growth. In this blog post, we’ll explore the transformative impact of AI on marketing and how businesses can leverage this technology to stay ahead of the curve.

The Rise of AI in Marketing

Artificial intelligence encompasses a range of technologies that enable machines to perform tasks that typically require human intelligence, such as problem-solving, pattern recognition, and decision-making. In the realm of marketing, AI-powered tools and algorithms are being increasingly deployed to streamline processes, analyze vast amounts of data, and deliver hyper-targeted campaigns.

Applications of AI in Marketing

1. Personalized Content: AI algorithms analyze customer data to deliver personalized content recommendations tailored to individual preferences and behaviors. Whether it’s product recommendations, email content, or social media ads, AI enables marketers to create hyper-targeted campaigns that resonate with their audience on a personal level.

2. Predictive Analytics: By analyzing historical data and identifying patterns, AI-powered predictive analytics tools can forecast future trends, consumer behavior, and market dynamics. This enables marketers to make data-driven decisions, anticipate customer needs, and proactively adjust marketing strategies for maximum impact.

3. Chatbots and Virtual Assistant: AI-powered chatbots and virtual assistants are revolutionizing customer service by providing instant responses to queries, resolving issues, and guiding users through the sales funnel. These intelligent bots offer round-the-clock support, enhance user experience, and free up human resources for more strategic tasks.
        </p>
</dvi>
    </div>
  )
}

export default EventDetails