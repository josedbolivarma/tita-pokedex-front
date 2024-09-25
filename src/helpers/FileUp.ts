export const FileUp = async (file: any) => {
    const cloud_name = "duzncuogi";
    const preset_name = "zxucfjuq";

    const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloud_name}/upload`

    const formData = new FormData()

    formData.append('upload_preset', preset_name); //conect to cloudinary
    formData.append('file', file); // file send

   const resp= await fetch(urlCloudinary, {
        method: 'POST',
        body: formData
    })
    const data = await resp.json()
    return data.secure_url

}