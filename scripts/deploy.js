const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

require('dotenv').config();

const args = minimist(process.argv.splice(2));
const env = process.env;

const client = new OSS({
  accessKeyId: env.accessKey,
  accessKeySecret: env.accessKeySecret,
  bucket: 'vingogo',
  region: 'oss-cn-guangzhou',
});

const deleteDir = async (prefix) => {
  const result = await client.list({
    'max-keys': 1000,
    prefix,
  });

  if (result.objects.length === 0) {
    return true;
  }

  console.log('开始删除');

  await client.deleteMulti(
    result.objects.map((obj) => obj.name),
    {
      quiet: true,
    }
  );

  console.log('删除完成');
  return true;
};

const uploadDir = (dir, prefix = '/') => {
  const docs = fs.readdirSync(dir);

  docs.forEach((doc) => {
    const src = `${dir}/${doc}`;
    const fsStat = fs.statSync(src);

    if (fsStat.isDirectory()) {
      uploadDir(src, `${prefix + doc}/`);
      return;
    }

    client.put(prefix + doc, src);
    console.log(`上传文件: ${prefix + doc}`);
  });
};

(async () => {
  const prefix = args.prefix;
  const dist = args.dist || 'dist';
  const res = await deleteDir(prefix);
  const target = path.join(process.cwd(), '/', dist);

  if (res !== true) {
    throw new Error('删除失败');
  }

  console.log('开始上传');

  uploadDir(target, `${prefix}/`);

  console.log('上传完成');
})();
