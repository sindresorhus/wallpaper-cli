import test from 'ava';
import execa from 'execa';

test(async t => {
	t.true((await execa.stdout('./cli.js', {cwd: __dirname})).length > 0);
});
