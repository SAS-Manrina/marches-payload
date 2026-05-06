import * as migration_20260420_164750 from './20260420_164750';
import * as migration_20260420_194909 from './20260420_194909';
import * as migration_20260420_200207 from './20260420_200207';
import * as migration_20260420_200826 from './20260420_200826';
import * as migration_20260420_201344 from './20260420_201344';
import * as migration_20260421_145453_add_participations from './20260421_145453_add_participations';
import * as migration_20260421_200634 from './20260421_200634';
import * as migration_20260505_add_organization_email from './20260505_add_organization_email';

export const migrations = [
  {
    up: migration_20260420_164750.up,
    down: migration_20260420_164750.down,
    name: '20260420_164750',
  },
  {
    up: migration_20260420_194909.up,
    down: migration_20260420_194909.down,
    name: '20260420_194909',
  },
  {
    up: migration_20260420_200207.up,
    down: migration_20260420_200207.down,
    name: '20260420_200207',
  },
  {
    up: migration_20260420_200826.up,
    down: migration_20260420_200826.down,
    name: '20260420_200826',
  },
  {
    up: migration_20260420_201344.up,
    down: migration_20260420_201344.down,
    name: '20260420_201344',
  },
  {
    up: migration_20260421_145453_add_participations.up,
    down: migration_20260421_145453_add_participations.down,
    name: '20260421_145453_add_participations',
  },
  {
    up: migration_20260421_200634.up,
    down: migration_20260421_200634.down,
    name: '20260421_200634',
  },
  {
    up: migration_20260505_add_organization_email.up,
    down: migration_20260505_add_organization_email.down,
    name: '20260505_add_organization_email',
  },
];
