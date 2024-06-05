import _ from "lodash";

export default function getDataInfo({
    fields = [],
    object = {},
}: {
    fields: string[];
    object: Object;
}) {
    return _.pick(object, fields);
}

export function removeFields({
    fields = [],
    object = {},
}: {
    fields: string[];
    object: Object;
}) {
    const data = _.omit(object, fields);
    return data;
}
