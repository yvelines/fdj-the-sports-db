import { InjectionToken } from '@angular/core';

import { IAppConfig } from '../../config/iapp.config';

export const AppConfigService = new InjectionToken<IAppConfig>('AppConfig');

export default AppConfigService;
