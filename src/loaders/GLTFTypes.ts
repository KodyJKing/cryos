
export enum GLTFRenderMode {
    POINTS = 0,
    LINE = 1,
    LINE_LOOP = 2,
    LINE_STRIP = 3,
    TRIANGLES = 4,
    TRIANGLE_STRIP = 5,
    // Note: fans are not supported in WebGPU, use should be
    // an error or converted into a list/strip
    TRIANGLE_FAN = 6,
};

export interface GLTFAttributes {
    TEXCOORD_0?: number
    NORMAL?: number
    TANGENT?: number
    POSITION: number
}

export interface GLTFPrimitive {
    mode?: GLTFRenderMode
    attributes: GLTFAttributes
    indices: number
    material: number
}
export interface GLTFMesh {
    name: string
    primitives: GLTFPrimitive[]
}
export interface GLTFBuffer {
    byteLength: number
}
export interface GLTFBufferView {
    buffer: number
    byteOffset: number
    byteLength: number
}
export interface GLTFNode {
    mesh?: number,
    rotation?: [number, number, number, number]
    scale?: [number, number, number]
    translation?: [number, number, number]
    matrix?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number,]
    children?: number[]
}
export interface GLTFImage {
    mimeType: string
    bufferView: number
}
export interface GLBMaterial {
    name: string
    normalTexture: { index: number }
    pbrMetallicRoughness: {
        baseColorTexture: { index: 0 }
        metallicRoughnessTexture: { index: 1 }
    }
}
export interface GLBAccessor {
    bufferView: number
    byteOffset?: number
    componentType: number
    count: number
    type: "SCALAR" | "VEC2" | "VEC3" | "VEC4" | "MAT2" | "MAT3" | "MAT4"
}
export enum GLTFComponentType {
    BYTE = 5120,
    UNSIGNED_BYTE = 5121,
    SHORT = 5122,
    UNSIGNED_SHORT = 5123,
    INT = 5124,
    UNSIGNED_INT = 5125,
    FLOAT = 5126,
    DOUBLE = 5130,
}
export enum GLTFType {
    SCALAR = 0,
    VEC2 = 1,
    VEC3 = 2,
    VEC4 = 3,
    MAT2 = 4,
    MAT3 = 5,
    MAT4 = 6
}
export interface GLBJSON {
    asset: { generator: string, version: string }
    accessors: GLBAccessor[]
    bufferViews: GLTFBufferView[]
    buffers: GLTFBuffer[]
    images: GLTFImage[]
    materials: GLBMaterial[]
    meshes: GLTFMesh[]
    nodes: GLTFNode[]
    scene: number
    scenes: { nodes: number[] }[]
    textures: { source: number }[]
}