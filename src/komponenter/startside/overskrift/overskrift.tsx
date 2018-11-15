import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../../brodsmuler/brodsmuler';

import './overskrift.less';

function Overskrift() {
    return (
        <div className="overskrift-veientilarbeid-container">
            <div className="overskrift-veientilarbeid">
                <Brodsmuler tittelId="overskrift-veientilarbeid"/>
                <Sidetittel className="overskrift-veientilarbeid__tittel">
                    <FormattedMessage id="overskrift-veientilarbeid"/>
                </Sidetittel>
            </div>
        </div>
    );
}

export default Overskrift;