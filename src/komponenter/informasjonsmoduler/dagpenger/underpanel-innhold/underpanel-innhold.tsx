import * as React from 'react';
import './underpanel-innhold.less';

interface Props {
    children: React.ReactChildren | React.ReactChild;
}

export default function UnderpanelInnhold(props: Props) {
    return (
        <div className="underpanel-innhold__wrapper">
            <div className="underpanel-innhold">
                {props.children}
            </div>
        </div>
    );
}
