export default async function queryJSON(url, target, options = {}) {
    const answer = await fetch(url, options),
        clone = answer.clone()
    let vendor_response
    try {
        vendor_response = await clone.json()
    } catch (e) {
        vendor_response = answer.body === null ? null : await answer.text()
    }

    if (
        typeof vendor_response === 'object' 
        && (
            target in vendor_response 
            || (typeof vendor_response[0] === 'object' && target in vendor_response[0])
        )
    ) {
        return { success: vendor_response }
    } else {
        const { hostname: vendor, pathname: vendor_resource } = new URL(url),
            error = 'Vendor resource retrieval failed.',
            details = { error, vendor, vendor_resource, vendor_status: answer.status, vendor_response }

        return { failure: details }
    }
}
