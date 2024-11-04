import React from 'react'
import { Accordion, Placeholder } from 'rsuite';
import 'rsuite/Accordion/styles/index.css';
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import "./faqs.css"
function FAQs() {
  return (
    <div>

        <div className='faqs-title'>
            <h3>Frequently Asked Questions</h3>
        </div>
        <div>
        <Accordion bordered>
    <Accordion.Panel header="Accordion Panel 1" defaultExpanded>
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="Accordion Panel 2">
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="Accordion Panel 3">
      <Placeholder.Paragraph />
    </Accordion.Panel>
  </Accordion>
        </div>

    </div>
  )
}

export default FAQs