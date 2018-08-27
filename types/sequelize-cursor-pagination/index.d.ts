// Type definitions for sequelize-cursor-pagination 1.1
// Project: https://github.com/Kaltsoon/sequelize-cursor-pagination
// Definitions by: pilagod <https://github.com/pilagod>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped/
// TypeScript Version: 2.9

import Sequelize = require('sequelize');

declare namespace SequelizeCursorPagination {
    interface Cursors {
        before: string | null;
        after: string | null;
        hasNext: boolean;
        hasPrevious: boolean;
    }

    interface BasicPaginateOptions<T> {
        where?: Sequelize.WhereOptions<T> | Sequelize.where | Sequelize.fn | Array<Sequelize.col | Sequelize.and | Sequelize.or | string>;
        attributes?: Sequelize.FindOptionsAttributesArray | { include?: Sequelize.FindOptionsAttributesArray, exclude?: string[] };
        include?: Array<Sequelize.Model<any, any> | Sequelize.IncludeOptions>;
        limit?: number; // limit the number of records returned
        desc?: boolean; // [default: false]
        before?: string; // the before cursor
        after?: string; // the after cursor
        paginationField?: string; // [default: primaryKeyField]
    }

    interface PaginateRawOptions<T> extends BasicPaginateOptions<T> {
        raw: true;
    }

    interface PaginateInstOptions<T> extends BasicPaginateOptions<T> {
        raw?: boolean;
    }

    interface WithPaginationOptions<MethodName extends string> {
        methodName?: MethodName; // [default: 'paginate']
        primaryKeyField?: string; // [default: 'id']
    }

    type WithPaginationModel<MethodName extends string, Model, ModelInst, ModelAttrs> = Model & {
        [key in MethodName]: {
            (options?: PaginateRawOptions<ModelAttrs>): { results: ModelAttrs[], cursors: Cursors }
            (options?: PaginateInstOptions<ModelAttrs>): { results: ModelInst[], cursors: Cursors }
        }
    };

    function withPagination<MethodName extends string = 'paginate'>(options?: WithPaginationOptions<MethodName>): (
        <Model extends Sequelize.Model<ModelInst, ModelAttrs>, ModelInst, ModelAttrs>(model: Model) => WithPaginationModel<MethodName, Model, ModelInst, ModelAttrs>
    );
}

export = SequelizeCursorPagination.withPagination;