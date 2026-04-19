const getValidationTargets = (schemaOrSchemas, source) => {
    const validSources = ["body", "params"];

    if (source) {
        return [{ key: source, schema: schemaOrSchemas }];
    }

    const schemaKeys = Object.keys(schemaOrSchemas || {});
    const matchedSources = schemaKeys.filter((key) => validSources.includes(key));

    if (matchedSources.length > 0) {
        return matchedSources.map((key) => ({
            key,
            schema: schemaOrSchemas[key]
        }));
    }

    return [{ key: "body", schema: schemaOrSchemas }];
};

const validate = (schemaOrSchemas, source) => (req, res, next) => {
    const targets = getValidationTargets(schemaOrSchemas, source);
    const errors = {};

    for (const target of targets) {
        const result = target.schema.safeParse(req[target.key]);

        if (!result.success) {
            errors[target.key] = result.error.flatten().fieldErrors;
            continue;
        }

        req[target.key] = result.data;
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validasi gagal",
            errors
        });
    }

    next();
};

export default validate;
