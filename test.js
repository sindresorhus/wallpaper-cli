import test from 'ava';
import execa from 'execa';

test(async t => {
	t.true((await execa('./cli.js')).stdout.length > 0);
});
