import { compileFromFile } from 'json-schema-to-typescript';
import { writeFileSync } from 'fs';

const PATH_TO_ENTITIES = 'src/entities';

export const schema_to_entity = async (schema_path: string | string[], output_path?: string) => {
    typeof schema_path === 'string' 
        ? create_entity(schema_path, output_path)
        : await Promise.all(recursive_create_entity(schema_path, output_path));
};

const recursive_create_entity = (schema_path: string[], output_path?: string) => schema_path.map( async (path) => {
    await create_entity(path, output_path)
})

const create_entity = async (schema_path: string, output_path?: string) => {
    let filename = schema_path.split('/').pop() as string;
    if (filename[0] === '_') return;
    const file_ext = filename.slice(-4);
    if (file_ext !== 'json') throw new Error('path not complete');
    filename = filename.split('.')[0]; // remove ext from filename
    
    const output = `${output_path ? output_path : PATH_TO_ENTITIES}/${filename}1.ts`;
    

    await compileFromFile(schema_path)
        .then(ts => writeFileSync(output, ts));
}
