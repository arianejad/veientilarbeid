import { ActionTypes as OppfolgingTypes } from './ducks/oppfolging';
import { ActionTypes as FeatureTogglesTypes } from './ducks/feature-toggles';
import { ActionTypes as ServicegruppeTypes } from './ducks/servicegruppe';
import { ActionTypes as SykmeldtInfodataTypes } from './ducks/sykmeldt-info';
import { ActionTypes as JobbsokerbesvarelseTypes } from './ducks/jobbsokerbesvarelse';

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => { // tslint:disable-line:no-any
    const { frontendlogger } = (window as any); // tslint:disable-line:no-any

    const feilTyper = [
        {
            type: OppfolgingTypes.HENT_OPPFOLGING_FEILET,
            eventnavn: 'veientilarbeid.feil.hentoppfolging',
            apikall: 'GET /startregistrering'
        },
        {
            type: FeatureTogglesTypes.FEATURE_TOGGLES_FEILET,
            eventnavn: 'veientilarbeid.feil.featuretoggle',
            apikall: 'GET /veientilarbeid/api/feature'
        },
        {
            type: ServicegruppeTypes.HENT_SERVICEGRUPPE_FEILET,
            eventnavn: 'veientilarbeid.feil.servicegruppe',
            apikall: 'GET /servicegruppe'
        },
        {
            type: SykmeldtInfodataTypes.HENT_SYKMELDT_INFO_FEILET,
            eventnavn: 'veientilarbeid.feil.sykmeldtinfo',
            apikall: 'GET /veilarbregistrering/api/sykmeldtinfo'
        },
        {
            type: JobbsokerbesvarelseTypes.HENT_JOBBSOKERBESVARELSE_FEILET,
            eventnavn: 'veientilarbeid.feil.jobbsokerbesvarelse',
            apikall: 'GET /jobbsokerbesvarelse'
        },
    ];

    /* Feil logging */
    feilTyper.map((feil) => {
        if (action.type === feil.type) {
            if (frontendlogger) {
                if (!action.data) {
                    frontendlogger.event(feil.eventnavn, {'statusText': 'Action data er undefined'}, {});
                } else {
                    const response = action.data.response || {};
                    const status = response.status;
                    const statusText = response.statusText;
                    const url = response.url;
                    const apikall = feil.apikall;
                    frontendlogger.event(feil.eventnavn, {
                        'useragent': navigator.userAgent,
                        url,
                        apikall,
                        status,
                        statusText,
                        data: action.data
                    },                   {});
                }
            }
        }
    });

    next(action);
};
