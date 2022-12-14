import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface UserEntity {
    id: number;
    username: string;
    description: string;
    password: string;
    email: string;
    name: string;
}

export interface UploadEntity {
    id: number;
    url: string;
    blob_name: string;
    blob_size: string;
    encoding: string;
    mime_type: string;
    original_name: string;
}

export interface DepositEntity {
    id: number;
    amount: number;
    user_id: number;
    created_at: string;
}

export interface UserFollowEntity {
    id: number;
    user_id: number;
    followed_user_id: number;
}

export interface DesignEntity {
    id: number;
    user_id: number;
    created_at: string;
    price: number;
    description: string;
}

export interface UserAvatarEntity {
    id: number;
    user_id: number;
    upload_id: number;
    created_at: string;
}

export interface DesignFileEntity {
    id: number;
    design_id: number;
    upload_id: number;
    created_at: string;
}

export interface LikeEntity {
    id: number;
    user_id: number;
    design_id: number;
}

export interface CommentEntity {
    id: number;
    design_id: number;
    user_id: number;
    description: string;
    created_at: string;
}

export interface PurchaseEntity {
    design_id: number;
    user_id: number;
    created_at: string;
}
