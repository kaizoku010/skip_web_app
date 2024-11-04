import React from 'react'
import { Accordion, Placeholder, Text  } from 'rsuite';
import 'rsuite/Accordion/styles/index.css';
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import "./faqs.css"
function FAQs() {
  return (
    <div>

        <div className='faqs-title'>
            <h3 className='cs0-title'>Frequently Asked Questions</h3>
        </div>
        <div className='ac-holder'>
        <Accordion bordered>
    <Accordion.Panel header="What is SK!p" defaultExpanded>
      <Text>
        SK!p  is a social media network designed to connect people with shared interests, discover events, and facilitate community engagement. Our platform also features a self-check-in option for events, making it easier for attendees to track and share their event participation.
      </Text>
    </Accordion.Panel>
    <Accordion.Panel header="How do i create an account?">
      <Text>To create an account, click on the Sign Up button on the home page, fill in your details, and follow the prompts. You’ll need a valid email address or can sign up using social media credentials.</Text>
    </Accordion.Panel>
    <Accordion.Panel header="What type of content can i post">
<Text>You can post status updates, photos, videos, links, and event check-ins. Our community guidelines apply to all content shared on the platform. Document posts are being worked on at the moment.</Text>
    </Accordion.Panel>

    <Accordion.Panel header="What is the self-check-in feature?">
<Text>The self-check-in feature allows users to check in at events on their own, making the process faster and more efficient. This feature helps organizers track attendance and allows participants to share their presence at events with friends on the platform.</Text>
    </Accordion.Panel>
    <Accordion.Panel header="What is the self-check-in feature?"></Accordion.Panel>

  </Accordion>
        </div>

    </div>
  )
}

export default FAQs