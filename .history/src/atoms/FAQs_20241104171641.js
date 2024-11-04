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
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="How can i rest my password">
      <Placeholder.Paragraph />
    </Accordion.Panel>
  </Accordion>
        </div>

    </div>
  )
}

export default FAQs