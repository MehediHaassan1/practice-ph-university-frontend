/* eslint-disable @typescript-eslint/no-explicit-any */
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const transformLabel = (label: string) => {
    return label
        .replace(/([A-Z])/g, ' $1')
        .split(' ')
        .map(capitalize)
        .join(' ');
};

export const transformData = (data: Record<string, any>) => {
    const keysToExclude = ["createdAt", "updatedAt", "__v", "_id", "user", "fullName", "isDeleted", "profileImg"];
    const keysToInclude = Object.keys(data).filter(key =>
        !keysToExclude.includes(key) && typeof data[key] !== 'object'
    );

    const nameFields = data.name;
    const fullName = `${nameFields?.firstName} ${nameFields?.middleName} ${nameFields?.lastName}`;

    const transformed = keysToInclude.map((key) => {
        // if (key === 'name') return null;
        return {
            key: key,
            label: transformLabel(key),
            value: data[key].toString()
        }
    })

    if (nameFields?.firstName) {
        transformed.push({
            key: (transformed.length + 1).toString(),
            label: "Full Name",
            value: fullName
        });
    }

    return transformed;
};