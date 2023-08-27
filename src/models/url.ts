import mongoose, { Document } from "mongoose";

interface Record extends Document {
	url_code: string;
	original_url: string;
	expiration_time?: Date;
	expireAt?: Date | null;
}

const urlSchema = new mongoose.Schema<Record>(
	{
		url_code: {
			type: String,
			unique: true,
			required: true,
		},
		original_url: {
			type: String,
			required: true,
		},
		expiration_time: {
			type: Date,
			required: false,
		},
		expireAt: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true }
);

urlSchema.pre("save", function(next){
	const url = this as Record;
	if (url?.expiration_time) {
		url.expireAt = new Date(url.expiration_time.getTime() + 60 * 1000);
	}

	next();
});

const Url = mongoose.models.Url || mongoose.model<Record>("Url", urlSchema);

export default Url;
