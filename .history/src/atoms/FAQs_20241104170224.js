import React from 'react'
import { Accordion, Placeholder } from 'rsuite';
import 'rsuite/Accordion/styles/index.css';

function FAQs() {
  return (
    <div>
         <Accordion>
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
  )
}

export default FAQs