import React from 'react';
import { A } from '../Elements/Elements';

const TLEDStaff = props => {
  return (
    <tbody>
      {props.data.map((row, index) => {
        if (row.gsx$lastname.$t.match(/vacant/i)) {
          return (
            <tr key={index} className="vacant">
              <td>Vacant</td>
              <td>{row.gsx$title.$t}</td>
              <td />
              <td />
              <td />
            </tr>
          );
        }
        let phone = row.gsx$extension.$t;
        if (phone) {
          phone = phone.match(/^[\d]{4}$/)
            ? `(512) 223-${phone}`
            : `(512) ${phone}`;
        }
        return (
          <tr key={index}>
            <td>
              {row.gsx$firstname.$t}{' '}
              {row.gsx$lastname.$t}
            </td>
            <td>{row.gsx$title.$t}</td>
            <td className="phone">
              {row.gsx$extension.$t && (
                <span>{phone}</span>
              )}
            </td>
            <td>
              {row.gsx$email.$t && (
                <span>
                  <A
                    href={
                      'mailto:' +
                      row.gsx$email.$t.trim() +
                      '@austincc.edu'
                    }
                  >
                    {row.gsx$email.$t.trim() + '@austincc.edu'}
                  </A>
                </span>
              )}
            </td>
            <td>{row.gsx$roomnumber.$t}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TLEDStaff;