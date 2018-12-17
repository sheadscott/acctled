import React from 'react';
import OneColumn from './OneColumn';
import TwoColumn from './TwoColumn';
import ThreeColumn from './ThreeColumn';
import Accordion from './Accordion';

export default (props) => {
  console.log('layouts', props.layouts);
  return (
    <div>
      {props.layouts && props.layouts.map((layout, index) => {
        if (layout.acf_fc_layout === 'one_column') {
          return <OneColumn mode={'compact'} key={`acf_layout_${index}`} layout={layout} />
        }
        if (layout.acf_fc_layout === 'two_columns') {
          return <TwoColumn key={`acf_layout_${index}`} layout={layout} />
        }
        if (layout.acf_fc_layout === 'three_columns') {
          return <ThreeColumn key={`acf_layout_${index}`} layout={layout} />
        }
        if (layout.acf_fc_layout === 'accordion') {
          return <Accordion key={`acf_layout_${index}`} layout={layout} />
        }

        return null
      })
      }
    </div>
  )
}
