export type ColumnType = {
    id: string,
    label: string,
    minWidth: number,
}

export type SettingColumnType = {
    id: string,
    label: string,
    minWidth: number,
    color: string,
    fontWeight: number,
}

export type StudentType = {
    _id: string,
    id: string,
    username: string,
    phoneNumber: string,
    email: string,
    password: string,
    religion: string,
    nationality: string,
    birthDate: string,
    rollNumber: string,
    registrationNumber: string,
    birthRegistrationNo: string,
    address: string,
    registrationData: Date,
    parentDetailsFather: {
        contactDetails:string,
        name:string,
        occupation:string,
    },
    parentDetailsMother: {
        contactDetails:string,
        name:string,
        occupation:string,
    },
    feeInfo:any,
    gender: string,
    photo: string,
    section: string,
    shift: string,
    class: string,
    waiver: any,
    admissionType: string,
    examMarks: any,
    student: any,
    examTypes: any,
}

export type TeacherType = {
    _id: string,
    id: string,
    username: string,
    phoneNumber: string,
    email: string,
    password: string,
    religion: string,
    nationality: string,
    birthDate: string,
    registrationNumber: string,
    birthRegistrationNo: string,
    address: string,
    fatherName:string,
    motherName:string,
    maritalStatus:string,
    nationalID:string,
    passportID:string,
    hscResult: {
        board:string,
        examination:string,
        group:string,
        passingYear:string,
        result:string,
    },
    sscResult: {
        board:string,
        examination:string,
        group:string,
        passingYear:string,
        result:string,
    },
    mastersResult: {
        board:string,
        examination:string,
        group:string,
        passingYear:string,
        result:string,
    },
    graduationResult: {
        board:string,
        examination:string,
        group:string,
        passingYear:string,
        result:string,
    },
    experience: {
        year:string,
        company:string,
        
    },
    gender: string,
    photo: string,
    role: string,
}

export type ClassType = {
    _id: string,
    year: string,
    shift: string,
    class: any,
    section: string,
    fee: any,
    subject: any,
    teacher: any,
    examName: any,
}

export type DashboardPDFProps = {
    link: string | undefined,
    
}

export type FestivalProps = {
    _id: string,
    title: string,
    year: string,
    photo: string,
    index: number,
}