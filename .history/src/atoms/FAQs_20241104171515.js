import React from 'react'
import { Accordion, Placeholder } from 'rsuite';
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
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="Is my personal data safe?">
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