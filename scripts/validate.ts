import {validateData} from '../src/domain/validate';const errors=validateData();if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('データ検証 OK');
