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
      <Text className='fq'>
        SK!p  is a social media network designed to connect people with shared interests, discover events, and facilitate community engagement. Our platform also features a self-check-in option for events, making it easier for attendees to track and share their event participation.
      </Text>
    </Accordion.Panel>
    <Accordion.Panel header="How do i create an account?">
      <Text>To create an account, click on the Sign Up button on the home page, fill in your details, and follow the prompts. You’ll need a valid email address or can sign up using social media credentials.</Text>
    </Accordion.Panel>
    <Accordion.Panel header="What type of content can i post">
<Text>You can post status updates, photos, videos, links, and event check-ins. Our community guidelines apply to all content shared on the platform. Document posts are being worked on at the moment.</Text>
    </Accordion.Panel>

    <Accordion.Panel header="How does self-check-in work?">
<Text>
For participating events, attendees can open the event page on the platform and tap the Check-In button once they arrive. Some events may require scanning a QR code provided at the venue for verification.    </Text>
    </Accordion.Panel>
    <Accordion.Panel header="How can I see who else has checked into an event?">
    On the user dashboard page, there is an Attendees section showing everyone who has checked in, as long as their privacy settings allow others to see this information.
    </Accordion.Panel>

  </Accordion>
        </div>

    </div>
  )
}

export default FAQs